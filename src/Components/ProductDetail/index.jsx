import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import "./styles.css"

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    //console.log("context.isProductDetailOpen: ",context.isProductDetailOPen)
    //console.log("PRODUCT SHOW", context.ProductToShow)
    return(
        <aside 
            className={`${context.isProductDetailOPen ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
           <div className="flex justify-between items-center p-6">
            <h2 className="font-medimu text-xl">Detail</h2>
            <div>
                <XMarkIcon 
                className="h-6 w-6 text-black cursor-pointer"
                onClick={()=> context.closeProductDetail()}></XMarkIcon>

            </div>

           </div>
           <figure className="px-6">
                <img 
                className= "w-full h-full rounded-lg" 
                src={context.ProductToShow.images} 
                alt={context.ProductToShow.title} />                
           </figure>
           <p className="flex flex-col p-6">
                <span className="fond-medium text-2xl mb-2">{context.ProductToShow.price}</span>
                <span className="fond-medium text-md">{context.ProductToShow.title}</span>
                <span className="fond-light text-sm">{context.ProductToShow.description}</span>

           </p>

        </aside>

    )
}

export default ProductDetail