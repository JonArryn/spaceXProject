class View {
  _dataHeader;
  _dataRows;

  renderHeader(data) {
    this._dataHeader = data;
  }

  _headerMarkup(headers) {
    headers.forEach((header) => {
      return `

    `;
    });
    return `

    `;
  }
}
