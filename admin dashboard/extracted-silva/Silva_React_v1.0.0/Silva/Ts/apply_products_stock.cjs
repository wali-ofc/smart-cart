const fs = require('fs');

const productsStockPath = 'src/app/(admin)/dashboard/ecommerce/components/ProductsStock.tsx';
let productsStock = fs.readFileSync(productsStockPath, 'utf8');

if (!productsStock.includes('import { useState, useEffect }')) {
    productsStock = "import { useState, useEffect } from 'react';\nimport api from '@/helpers/api';\n" + productsStock;
}

const psHookCode = `
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        api.get('/admin/products').then(res => {
            if(res.data.success) {
                setProducts(res.data.data.slice(0, 5)); // Limit to 5 for the widget
            }
        }).catch(err => console.error("Error fetching products", err));
    }, []);
`;
productsStock = productsStock.replace('const ProductsStock = () => {', 'const ProductsStock = () => {' + psHookCode);

const tableBodyRegex = /<tbody>[\s\S]*?<\/tbody>/;
const dynamicTbody = `<tbody>
    {products.length === 0 ? (
        <tr><td colSpan={6} className="text-center">No products found</td></tr>
    ) : (
        products.map((item: any, idx: number) => (
            <tr key={idx}>
                <td>{item.title}</td>
                <td className="text-muted">#{item._id.slice(-6).toUpperCase()}</td>
                <td className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="text-muted">$\${item.price}</td>
                <td>
                    {item.stock > 10 ? (
                        <span className="badge bg-success-subtle text-success fw-semibold fs-13">In Stock</span>
                    ) : item.stock > 0 ? (
                        <span className="badge bg-warning-subtle text-warning fw-semibold fs-13">Low Stock</span>
                    ) : (
                        <span className="badge bg-danger-subtle text-danger fw-semibold fs-13">Out of Stock</span>
                    )}
                </td>
                <td>{item.stock} Items</td>
            </tr>
        ))
    )}
</tbody>`;

productsStock = productsStock.replace(tableBodyRegex, dynamicTbody);

fs.writeFileSync(productsStockPath, productsStock, 'utf8');
console.log("ProductsStock data wired!");
