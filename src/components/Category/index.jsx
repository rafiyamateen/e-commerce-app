import { useSelector } from "react-redux";
import { useParams } from "react-router"
import Products from './../Products'

const Category = () => {
    const params = useParams(),
        products = useSelector(state => state.products.products),
        category = products.filter(prod => prod.category === params.category.replace(/_/g, ' '))
    return (
        <Products products={category} title={`category | ${params.category}`} />
    )
}
export default Category