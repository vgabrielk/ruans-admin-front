export  const cursorPaginator = (item: string) => {
    switch (item) {
      case '&laquo; Previous':
        return '🡸'
        break
      case 'Next &raquo;':
        return '🡺'
        break
      default:
        return item
    }
  }