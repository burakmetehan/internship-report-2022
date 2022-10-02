export const BOOK_COLUMNS = [
  {
    title: 'Book Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Page Count',
    dataIndex: 'pageCount',
    key: 'pageCount'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    eky: 'publisher'
  },
  {
    title: 'Publication Date',
    dataIndex: 'publicationDate',
    key: 'publicationDate'
  }
];

export const PAGINATION = {
  showSizeChanger: true,
  current: 1, // Current page number
  pageNumber: 0, // Page number for backend call
  pageSize: 5, // Page size for both table and backend call
  pageSizeOptions: [5, 10, 20, 50, 100],
  total: 0 // Total number of data items
}
