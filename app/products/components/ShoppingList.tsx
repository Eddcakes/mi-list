import { useState } from "react"
import { VStack, Center, Button } from "@chakra-ui/react"
import { TriangleDownIcon } from "@chakra-ui/icons"

import { ProductItem, IProduct } from "app/products/components/ProductItem"

interface ShoppingListProps {
  items: IProduct[]
}

export function ShoppingList({ items }: ShoppingListProps) {
  const [products, setProducts] = useState(items)
  const [filterBy, setFilterBy] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  return (
    <>
      <Center pt={5} justifyContent="space-around">
        <Button leftIcon={<TriangleDownIcon />}>Sort by</Button>
        <Button leftIcon={<TriangleDownIcon />}>Filter by</Button>
      </Center>
      <VStack spacing="24px" pt={5}>
        {products
          .filter((product: IProduct) => !product.isDeleted)
          .map((product: IProduct) => (
            <ProductItem
              key={product.id}
              id={product.id}
              category="test"
              name={product.name}
              isComplete={product.isComplete}
              isImportant={product.isImportant}
            />
          ))}
      </VStack>
    </>
  )
}
