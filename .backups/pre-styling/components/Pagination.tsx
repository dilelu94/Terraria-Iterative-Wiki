import React from 'react';
import { Language } from '../types';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  lang: Language;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage, lang }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-controls">
      <button 
        disabled={currentPage === 1} 
        onClick={() => {
          setCurrentPage(prev => prev - 1);
          window.scrollTo(0, 0);
        }}
        className="page-btn"
      >
        {lang === 'es' ? '← Anterior' : '← Previous'}
      </button>
      
      <span className="page-info">
        {lang === 'es' ? `Página ${currentPage} de ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
      </span>

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => {
          setCurrentPage(prev => prev + 1);
          window.scrollTo(0, 0);
        }}
        className="page-btn"
      >
        {lang === 'es' ? 'Siguiente →' : 'Next →'}
      </button>
    </div>
  );
};

export default Pagination;
