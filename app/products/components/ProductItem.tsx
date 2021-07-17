import { useState, ChangeEvent } from "react"
import { useMutation, invalidateQuery } from "blitz"
import { CheckCircleIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Badge,
  Box,
  Checkbox,
  Grid,
  GridItem,
  IconButton,
  Input,
  Button,
  Collapse,
} from "@chakra-ui/react"

import getProducts from "app/products/queries/getProducts"
import updateProduct from "app/products/mutations/updateProduct"

export interface IProduct {
  id: number
  name: string
  category: string
  isComplete?: boolean
  isImportant?: boolean
  isDeleted?: boolean
}

export function ProductItem({ id, name, category, isComplete, isImportant }: IProduct) {
  const [updateProductMutation] = useMutation(updateProduct)
  const [editing, setEditing] = useState(false)
  /* or should i change to reducer pattern */
  const [inputName, setInputName] = useState(name)
  const [completeChecked, setCompleteChecked] = useState(isComplete)

  const handleStartEdit = () => {
    setEditing(true)
  }
  const handleCompleteEdit = () => {
    setEditing(false)
    handleUpdateProduct({ name: inputName })
  }
  const handleCancelEdit = () => {
    setEditing(false)
  }
  const handleToggleComplete = (evt: ChangeEvent<HTMLInputElement>) => {
    setCompleteChecked(evt.target.checked)
    //I probably want some sort of time out to handle spam clickage
    //mutate isComplete
    handleUpdateProduct({ name: name, isComplete: evt.target.checked })
  }
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputName(evt.target.value)
    //do mutation to save the changes
  }
  const handleSoftDelete = async () => {
    handleUpdateProduct({ name: name, isDeleted: true })
  }
  const handleUpdateProduct = async (values) => {
    console.log(values)
    try {
      const updated = await updateProductMutation({
        id: id,
        ...values,
      })
      console.log(updated)
      //do i need to do anything with updated?
      invalidateQuery(getProducts) //refresh the list
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      alignItems="center"
      borderColor={isImportant ? "purple.200" : "inherit"}
      bg={isImportant ? "purple.100" : "inherit"}
      opacity={isComplete ? "25%" : "1"}
      w="100%"
    >
      <Grid templateColumns="1fr 4fr 1fr 1fr 1fr" gap={6}>
        <GridItem>
          <IconButton
            icon={<DeleteIcon />}
            aria-label="delete this item"
            onClick={handleSoftDelete}
          />
        </GridItem>
        <GridItem>
          {editing ? (
            <Input p={2} value={inputName} onChange={handleInputChange} />
          ) : (
            <Box p={2} borderWidth={1} borderColor="transparent">
              {name}
            </Box>
          )}
        </GridItem>
        <GridItem>
          {editing ? (
            <IconButton
              icon={<CheckCircleIcon />}
              aria-label="save changes"
              color="green"
              onClick={handleCompleteEdit}
            />
          ) : (
            <IconButton icon={<EditIcon />} aria-label="edit this item" onClick={handleStartEdit} />
          )}
        </GridItem>
        <GridItem>
          <Badge>{category}</Badge>
        </GridItem>
        <GridItem>
          <Checkbox
            size="lg"
            colorScheme="purple"
            isChecked={completeChecked}
            onChange={handleToggleComplete}
          />
        </GridItem>
      </Grid>
      <Collapse in={editing} animateOpacity>
        <Box pt={4} textAlign="end">
          <Button onClick={handleCancelEdit} size="sm">
            Cancel edit
          </Button>
        </Box>
      </Collapse>
    </Box>
  )
}
