
import React, {useState} from 'react'
import ReactPaginate from 'react-paginate';
import CartDesign from './CartDesign';

function Pagination({data}) {
    
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
        <div className='row align-items-center justify-content-between row-gap'>
            { 
                (currentItems?.length > 0 ) &&(
                    currentItems?.map((product)=>(
                        <CartDesign product={product} key={product.id}/>
                    ))
                )
            }
        </div>
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className='paginate'
        />
        </>
    );
}

export default Pagination
