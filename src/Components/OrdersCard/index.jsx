import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
    
    return(
        <div className="flex justify-between items-center border border-black rounded-lg p-4 w-80 mb-4">
           <div className="flex justify-between w-full">
            <p className="flex flex-col">
                <span className="font-light">01.02.23</span>
                <span className="font-light">{totalProducts} articles</span>
            </p>    
            <p className="flex items-center gap-2">
                <span className="font-medium text-2xl">${totalPrice}</span>
                    <ChevronRightIcon 
                    className="h-6 w-6 text-black cursor-pointer"></ChevronRightIcon>
            </p>
           </div>
        </div>
    )
}

OrdersCard.propTypes = {
    totalPrice: PropTypes.number.isRequired, // Asegúrate de que 'id' sea requerido y sea de tipo string 
    totalProducts: PropTypes.number.isRequired, // Por ejemplo, asumiendo que 'price' es un número   
}
export default OrdersCard