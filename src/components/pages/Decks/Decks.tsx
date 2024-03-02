import { Table } from '@/components/ui/Table'

export const DecksPage = () => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Cards</Table.HeadCell>
          <Table.HeadCell>Last Updated</Table.HeadCell>
          <Table.HeadCell>Created By</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>asdfdsfs</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>12</Table.Cell>
          <Table.Cell>afsdfds</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
