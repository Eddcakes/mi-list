import { Suspense } from "react"
import { Head, BlitzPage, useQuery } from "blitz" //usePaginatedQuery, useRouter,Link,
import { Box, Button, Link as ChakraLink } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"

//const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  // const router = useRouter()
  // const page = Number(router.query.page) || 0
  const [{ data: products }] = useQuery(getProducts, null) //{ products, hasMore }

  /*   const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } }) */
  return (
    <div>
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

const ProductsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div>
        <p>
          <ChakraLink href="/products/new">Create Product</ChakraLink>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
