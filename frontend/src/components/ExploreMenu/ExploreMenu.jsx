import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import axios from 'axios';
import headerImage from '../../assets/header_img.png'; // Your banner image

const url = "http://localhost:4000";

const ExploreMenu = ({ category, setCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchZomatoApi = async () => {
            try {
                const res = await axios.get(`${url}/api/food/swiggy-menu`, {
                    params: {
                        lat: 12.9716,
                        lng: 77.5946,
                        id: "12345",
                    },
                });

                if (res.data.categories) {
                    const items = res.data.categories.flatMap(cat => cat.itemCards || []);
                    setCategories(items);
                }
            } catch (err) {
                console.log("Error:", err);
            }
        };
        fetchZomatoApi();
    }, []);

    const removeFood = (id) => {
        setCategories(prev => prev.filter(item => item._id !== id));
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            {/* 🔼 Top Banner Image */}
            <div className="nawab-banner">
                <img src={headerImage} alt="Header" className="nawab-image" />
            </div>

            {/* Section Heading */}
            <h1 className='h1e'>Explore our menu</h1>
            <p className='explore-menu-text'>
                Choose from a diverse menu featuring a delectable array of dishes.
            </p>

            {/* Category List */}
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() =>
                            setCategory(prev =>
                                prev === item.menu_name ? "All" : item.menu_name
                            )
                        }
                        key={index}
                        className='explore-menu-list-item'
                    >
                        <img
                            className={category === item.menu_name ? "active" : ""}
                            src={item.menu_image}
                            alt=""
                        />
                        <p className='item_menu'>{item.menu_name}</p>
                    </div>
                ))}
            </div>

            {/* Render fetched items */}
            <div className="fetched-items">
                {categories.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img
                            src={item.image ? `${url}/images/${item.image}` : "https://via.placeholder.com/100"}
                            alt={item.name}
                        />
                        <p>{item.name || "Unnamed item"}</p>
                        <p>{item.category || "General"}</p>
                        <p>${item.price || "N/A"}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
