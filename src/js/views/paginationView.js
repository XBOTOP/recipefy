import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const backBtn = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
      </button>
    `;
    const frontBtn = `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    console.log(numPages);
    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
       ${frontBtn}`;
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return `
       ${backBtn}`;
    }
    //Other page
    if (curPage < numPages) {
      return `
    ${backBtn} ${frontBtn}`;
    }
    //Page 1, and there are other no pages
    return '';
  }
}

export default new PaginationView();
