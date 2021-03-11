import { Suspense } from "react"
import { Head, BlitzPage, useQuery, useMutation, useRouter } from "blitz" //usePaginatedQuery, useRouter,Link,
import {
  Badge,
  Box,
  Checkbox,
  HStack,
  IconButton,
  Link as ChakraLink,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"

//const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)
  // const page = Number(router.query.page) || 0
  const [{ data: products }] = useQuery(getProducts, null) //{ products, hasMore }

  /*   const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } }) */
  return (
    <div>
      <VStack spacing="24px" pt={5}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            category="test"
            name={product.name}
            isComplete={product.isComplete}
          />
        ))}
      </VStack>
      <ProductForm
        submitText="Create Product"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProduct}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const product = await createProductMutation(values)
            router.push(`/products/${product.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Box>
              <ChakraLink href={`/products/${product.id}`}>{product.name}</ChakraLink>- {product.id}
            </Box>
          </li>
        ))}
      </ul>
      {/* 
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
            <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}

const ProductItem = ({ id, name, category, isComplete }) => {
  return (
    <HStack spacing="24px" p={5} shadow="md" borderWidth="1px">
      <IconButton icon={<DeleteIcon />} aria-label="delete this item" />
      <Wrap>{name}</Wrap>
      <IconButton icon={<EditIcon />} aria-label="edit this item" />
      <Badge>{category}</Badge>
      <Checkbox size="lg" colorScheme="orange" />
    </HStack>
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
          <ChakraLink href="/products/new">Create Product</ChakraLink>
        </p>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
