import { Component } from '@angular/core';
import * as _ from '/underscore/underscore.js';

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
        // calculate total pages
        const pageIndexShow:number = 3;
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage: number, endPage: number;
        if (totalPages <= pageIndexShow) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage > pageIndexShow) {
                if(currentPage >= totalPages || currentPage >= (totalPages - pageIndexShow)){
                startPage = currentPage - pageIndexShow;
                endPage = totalPages;
                }else{
                startPage = currentPage -1;
                endPage = startPage + pageIndexShow;
                }
            } else if (currentPage + pageIndexShow >= totalPages) {
                startPage = pageIndexShow;
                endPage = totalPages;
            }
            else {
                startPage = currentPage -1 ;
                endPage = currentPage + pageIndexShow;
            }
        }
 
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);
 
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
    }
}