import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import ProductTitle from '../ProductDetails/ProductTitle';
import ProductDescription from '../ProductDetails/ProductDescription';
import ProductImage from '../ProductDetails/ProductImage';
import ProductColors from '../ProductDetails/ProductColors';
import ProductSizes from '../ProductDetails/ProductSizes';
import Alert from '../Alerts/Alert';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';
import { useTheme } from "../../context/ThemeContext";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [alert, setAlert] = useState({ message: '', type: 'error' });
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState('');
    const [canPostReview, setCanPostReview] = useState(false);
    const [hasPostedReview, setHasPostedReview] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { updateItemCount } = useCart();
    const { isDark } = useTheme();
    const location = useLocation();
    const currentUrl = window.location.href;


    const textColor = isDark ? "text-slate-200" : "text-black";
    const subTextColor = isDark ? "text-slate-300" : "text-gray-600";
    const BgColor = isDark ? "bg-slate-600" : "bg-white";
    const borderColor = isDark ? "text-slate-600" : "bg-white";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`); //localhost
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);

                    if (data.models.length > 0) {
                        const firstModel = data.models[0];
                        setSelectedColor(firstModel.color);
                        setSelectedSize(firstModel.size);
                    }
                    const uniqueReviews = Array.from(new Set(data.reviews.map(review => review.review_id)))
                        .map(id => data.reviews.find(review => review.review_id === id));
                    setReviews(uniqueReviews);
                    checkIfProductInCartAndReview(uniqueReviews);
                } else {
                    setAlert({ message: data.message || 'Erreur lors de la récupération du produit', type: 'error' });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du produit : ", error);
                setAlert({ message: 'Erreur interne du serveur', type: 'error' });
            }
        };

        fetchProduct();
    }, [id, refresh]);

    const checkIfProductInCartAndReview = async (productReviews = reviews) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        try {
            const response = await axios.get('http://localhost:8000/api/cart', { params: { userId: user.id } }); //localhost
            const cartItems = response.data.items;
            const productInCart = cartItems.some(item => item.product_id === parseInt(id));
            const existingReview = productReviews.some(review => review.user_id === user.id);

            setCanPostReview(productInCart && !existingReview);
            setHasPostedReview(existingReview);
        } catch (error) {
            console.error("Erreur lors de la vérification du panier et des avis : ", error);
        }
    };

    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('cart_token');
        const selectedModel = product.models.find(model => model.color === selectedColor && model.size === selectedSize);

        if (!selectedModel) {
            setAlert({ message: "Modèle sélectionné non disponible", type: 'error' });
            return;
        }

        const data = {
            model_id: selectedModel.model_id,
            quantity,
            ...(user ? { user_id: user.id } : token ? { token } : {}),
        };

        axios.post(`http://localhost:8000/api/cart/add/${product.id}`, data) //localhost
            .then(response => {
                setAlert({ message: "Produit ajouté au panier !", type: 'success' });
                if (response.data.token) {
                    localStorage.setItem('cart_token', response.data.token);
                }

                updateItemCount();

                checkIfProductInCartAndReview();

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du produit au panier : ", error);
                setAlert({ message: "Erreur lors de l'ajout du produit au panier.", type: 'error' });
            });
    };

    const handleAddReview = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            product_id: product.id,
            model_id: product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.model_id,
            comment: review,
            user_id: user ? user.id : null,
        };


        axios.post('http://localhost:8000/api/product/add/review', data) //localhost
            .then(response => {
                setAlert({ message: "Avis ajouté avec succès !", type: 'success' });
                setReviews([response.data.review, ...reviews]);
                setReview('');
                setCanPostReview(false);
                setHasPostedReview(true);
                setRefresh(!refresh);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'avis : ", error);
                setAlert({ message: "Erreur lors de l'ajout de l'avis.", type: 'error' });
            });
    };

    const handleEditReview = (review) => {
        setEditingReview(review.review_id);
        setEditReviewContent(review.comment);
    };

    const handleUpdateReview = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            user_id: user.id,
            comment: editReviewContent,
        };

        axios.patch(`http://localhost:8000/api/review/update/${editingReview}`, data) //localhost
            .then(response => {
                setAlert({ message: "Avis mis à jour avec succès !", type: 'success' });
                setReviews(reviews.map(r => (r.review_id === editingReview ? response.data.review : r)));
                setEditingReview(null);
                setEditReviewContent('');
                setRefresh(!refresh);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'avis : ", error);
                setAlert({ message: "Erreur lors de la mise à jour de l'avis.", type: 'error' });
            });
    };

    const handleDeleteReview = (reviewId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = { user_id: user.id };

        axios.delete(`http://localhost:8000/api/review/delete/${reviewId}`, { data }) //localhost
            .then(response => {
                setAlert({ message: "Avis supprimé avec succès !", type: 'success' });
                setReviews(reviews.filter(r => r.review_id !== reviewId));
                checkIfProductInCartAndReview();
                setRefresh(!refresh);
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de l'avis : ", error);
                setAlert({ message: "Erreur lors de la suppression de l'avis.", type: 'error' });
            });
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);

        const sizesForColor = product.models
            .filter(model => model.color === color)
            .map(model => model.size);

        if (sizesForColor.length > 0) {
            setSelectedSize(sizesForColor[0]);
        } else {
            setSelectedSize(null);
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };



    const uniqueColors = Array.from(new Set(product?.models.map(model => model.color)));
    const uniqueSizes = Array.from(new Set(product?.models.filter(model => model.color === selectedColor).map(model => model.size)));
    const filteredModel = product?.models.find(model => model.color === selectedColor && model.size === selectedSize);
    const promotion = product?.promotions.length > 0 ? product.promotions[0] : null;

    return (
        <>
            <Helmet>
                <title>{product ? `${product.name} - Epimusic` : "Produit - Epimusic"}</title>
                <meta name="description" content={product ? `Découvrez ${product.name} sur Epimusic. ${product.description}` : "Découvrez nos produits musicaux sur Epimusic."} />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={product ? `${product.name} - Epimusic` : "Produit - Epimusic"} />
                <meta property="og:description" content={product ? `Découvrez ${product.name} sur Epimusic. ${product.description}` : "Découvrez nos produits musicaux sur Epimusic."} />
                <meta property="og:image" content={product?.models[0]?.images?.[0] || null} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:site_name" content="Epimusic" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product ? `${product.name} - Epimusic` : "Produit - Epimusic"} />
                <meta name="twitter:description" content={product ? `Découvrez ${product.name} sur Epimusic. ${product.description}` : "Découvrez nos produits musicaux sur Epimusic."} />
                <meta name="twitter:image" content={product?.models[0]?.images?.[0] || null} />
                <meta name="twitter:site" content="@Epimusic" />
                <meta name="twitter:creator" content="@Epimusic" />
            </Helmet>

            <div className="p-6">
                <Alert message={alert?.message} type={alert?.type} />

                {product && (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className={`${isDark ? 'text-slate-200' : 'text-black'} space-y-4`}>
                            <ProductTitle name={product.name} category={product.category.name} isDark={isDark} />
                            <ProductImage images={filteredModel?.images || []} />
                        </div>

                        <div className="space-y-4 mt-16 pt-12">
                            <ProductDescription
                                category={product.category.name}
                                description={product.description}
                                stock={filteredModel?.stock}
                                color={filteredModel?.color}
                                size={`${filteredModel?.size || ''}`}
                                price={`${filteredModel?.price || ''}`}
                                weight={`${product.weight || ''}`}
                                promotion={promotion}
                                isDark={isDark}
                            />
                            <ProductColors
                                colors={uniqueColors}
                                selectedColor={selectedColor}
                                onColorSelect={handleColorSelect}
                                isDark={isDark}
                            />
                            <ProductSizes
                                sizes={uniqueSizes}
                                selectedSize={selectedSize}
                                onSizeSelect={handleSizeSelect}
                                isDark={isDark}
                            />

                            <div className="space-y-4">
                                <label htmlFor="quantity" className="sr-only">Quantité</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    aria-label="Quantité"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    max={filteredModel?.stock || 1}
                                    className={`border ${borderColor} rounded-md p-2 mr-4`}
                                />
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                                    aria-label={`Ajouter ${product.name} au panier`}
                                >
                                    Ajouter au panier
                                </button>

                                {canPostReview && (
                                    <div className="space-y-2">
                    <textarea
                        id="new-review"
                        aria-label="Ajouter un avis"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Écrire un avis"
                        className={`border ${borderColor} ${BgColor} text-white rounded-md p-2 w-full ${isDark ? 'placeholder-slate-200' : 'placeholder-gray-800'}`}
                    />
                                        <button
                                            onClick={handleAddReview}
                                            className="bg-blue-500 text-white py-2 px-4 rounded"
                                            aria-label="Soumettre l'avis"
                                        >
                                            Ajouter un avis
                                        </button>
                                    </div>
                                )}
                            </div>

                            {hasPostedReview && reviews.map((review) => (
                                <div key={review.review_id} className={`border ${borderColor} ${BgColor} rounded-md p-4 space-y-2`} aria-label={`Avis de ${review.username}`}>
                                    <p className={`font-semibold ${textColor}`}>
                                        <strong>
                                            {review.user_id ? `${review.user_firstname} ${review.user_lastname || ''}`.trim() : review.user_firstname || "Anonyme"}
                                        </strong>
                                        <span className={`text-sm ${subTextColor} ml-2`}>
                      {new Date(review.created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                                    </p>
                                    <p className={`${subTextColor}`}>{review.comment}</p>

                                    {review.user_id === JSON.parse(localStorage.getItem('user'))?.id && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditReview(review)}
                                                aria-label="Modifier l'avis"
                                                className="bg-yellow-500 text-white py-1 px-2 rounded"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteReview(review.review_id)}
                                                aria-label="Supprimer l'avis"
                                                className="bg-red-500 text-white py-1 px-2 rounded"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    )}

                                    {editingReview === review.review_id && (
                                        <div className="mt-2">
                      <textarea
                          id={`edit-review-${review.review_id}`}
                          aria-label="Modifier votre avis"
                          value={editReviewContent}
                          onChange={(e) => setEditReviewContent(e.target.value)}
                          className={`border ${borderColor} ${BgColor} ${isDark ? 'text-white' : 'text-black'} rounded-md p-2 w-full`}
                      />
                                            <button
                                                onClick={handleUpdateReview}
                                                aria-label="Mettre à jour l'avis"
                                                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                                            >
                                                Mettre à jour l'avis
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetailsPage;