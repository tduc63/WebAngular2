"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("/underscore/underscore.js");
var PagerService = (function () {
    function PagerService() {
    }
    PagerService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 5; }
        // calculate total pages
        var pageIndexShow = 3;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= pageIndexShow) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage > pageIndexShow) {
                if (currentPage >= totalPages || currentPage >= (totalPages - pageIndexShow)) {
                    startPage = currentPage - pageIndexShow;
                    endPage = totalPages;
                }
                else {
                    startPage = currentPage - 1;
                    endPage = startPage + pageIndexShow;
                }
            }
            else if (currentPage + pageIndexShow >= totalPages) {
                startPage = pageIndexShow;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 1;
                endPage = currentPage + pageIndexShow;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return PagerService;
}());
exports.PagerService = PagerService;
//# sourceMappingURL=page.services.js.map