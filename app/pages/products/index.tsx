import { Suspense } from "react"
import {
  Head,
  Link as BlitzLink,
  BlitzPage,
  useQuery,
  useMutation,
  invalidateQuery,
  Routes,
} from "blitz" //usePaginatedQuery, useRouter,Link,
import { Link as ChakraLink, Button } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"

import { ShoppingList } from "app/products/components/ShoppingList"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"

//const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  //const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)
  // const page = Number(router.query.page) || 0
  const [products, { refetch }] = useQuery(getProducts, null) //{ products, hasMore }

  /*   const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } }) */
  return (
    <div>
      <ShoppingList items={products.data} />
      <ProductForm
        submitText="Create Product"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        //schema={}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const product = await createProductMutation(values)
            console.log("new item: ", product.id)
            refetch()
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <Button colorScheme="purple" onClick={() => invalidateQuery(getProducts)}>
        Invalidate
      </Button>
    </div>
  )
}

const ProductsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
        <p>
          <BlitzLink href={Routes.NewProductPage()}>Create Product</BlitzLink>
        </p>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
