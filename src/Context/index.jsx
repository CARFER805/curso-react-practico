import { createContext, useState, useEffect } from "react"
import PropTypes from 'prop-types'; // Agrega esta línea para importar PropTypes


export const ShoppingCartContext= createContext()

export const ShoppingCartProvider=({children}) => {
    
    // Shopping Cart . Increment quantity
    const [count, setCount] = useState(0)

    // Product Detail . Open/Close
    const [ isProductDetailOPen, setIsProductDetailOPen ] = useState(false)
    const openProductDetail = ()=> setIsProductDetailOPen(true)
    const closeProductDetail = ()=> setIsProductDetailOPen(false)
    //console.log("Count: ", count)
   
    //Checkout Side Mneu - OPen/Close
    const [ isCheckoutSideMenuOPen, setIsCheckoutSideMenuOPen ] = useState(false)
    const openCheckoutSideMenu = ()=> setIsCheckoutSideMenuOPen(true)
    const closeCheckoutSideMenu = ()=> setIsCheckoutSideMenuOPen(false)

    // Product Detail . Show product
    const [ ProductToShow, setProductToShow ] = useState({})

    //Shopping Cart - Add Products to cart
    const [ cartProducts, setCartProducts ] = useState([])

    //Shopping Cart - Order
    const [order, setOrder] = useState([])

    //Get products
    const [items, setItems] = useState(null)

    const [filteredItems, setFilteredItems] = useState(null)


    useEffect(()=> {
        fetch("https://api.escuelajs.co/api/v1/products")
        .then (response => response.json())
        .then (data => setItems(data))
  
    }, [])

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)
    //console.log("searchByTitle: ", searchByTitle )

    //Get products by Category
    const [searchByCategory, setSearchByCategory] = useState(null)
    //console.log("searchByCategory: ", searchByCategory )
    

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))

    }
    
    //console.log("filteredItems: ", filteredItems)

    const filteredItemsByCategory = (items, searchByCategory) => {
        
        //console.log("items: ", items[0].category.name)
        //console.log("searchByCategory: ", searchByCategory )
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
        //.includes(searchByCategory.toLowerCase())
    }
    
    //console.log("searchByCategory: ", searchByCategory )
    //console.log("filteredItemsByCategory: ", filteredItemsByCategory)
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === "BY_TITLE"){
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === "BY_CATEGORY"){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === "BY_TITLE_AND_BY_CATEGORY"){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if (!searchType){
            return items
        }

    }
    useEffect(()=> {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_AND_BY_CATEGORY",items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE",items, searchByTitle, searchByCategory)) 
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_CATEGORY",items, searchByTitle, searchByCategory)) 
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory))
    
    }, [ items, searchByTitle, searchByCategory ])

    
    
    return(
        <ShoppingCartContext.Provider value = {{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOPen,
            ProductToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOPen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory

        }}>
            {children}
        </ShoppingCartContext.Provider>


    )
}

// Agrega la validación de PropTypes para las propiedades esperadas
ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired
}