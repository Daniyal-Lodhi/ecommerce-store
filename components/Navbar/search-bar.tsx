import { Search } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import ProductCard from '../Product/product-card';
import { useParams, usePathname } from 'next/navigation';


interface SearchBarProps {
    searchBarData: Product[]
}

const SearchBar: React.FC<SearchBarProps> = ({ searchBarData }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [screenSize, setScreenSize] = useState('');
    const [searchDropheight, setsearchDropheight] = useState('');
    const [searchQuery, setSearchQuery] = useState('');  
    const pathname = usePathname();
    useEffect(()=>{
        setShowSearchBar(false);
    },[pathname])
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth<640){
                setScreenSize(`300px`);
                setsearchDropheight(`${Math.round(window.innerHeight * 0.8)}px`)

            }
            else{
                setScreenSize(`${Math.round(window.innerWidth * 0.5)}px`);
                setsearchDropheight('400px')

            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Filter products based on searchQuery
    const filteredProducts = searchBarData.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (showSearchBar && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearchBar]); 

    return (
        <div className='relative'>
            <button
                className={`flex items-center space-x-1 ${showSearchBar ? 'text-black font-bold' : 'text-gray-500'}`}
                onClick={() => setShowSearchBar(!showSearchBar)}
            >
                <span>Search</span>
                <Search size={16} />
            </button>

            <div
                className={`absolute ${showSearchBar ? 'border':'border-none'} border-gray-200  border sm:right-0 -right-20   top-8 shadow-2xl  rounded-md flex flex-col transition-all duration-300 ease-in-out`}
                style={{
                    width: screenSize,
                    maxHeight: showSearchBar ? searchDropheight : '0px',  // Smooth transition using maxHeight
                    overflow: 'hidden',  // Ensure content is hidden when the height is 0
                }}
            >
                {/* Fixed search input */}
                <div className="p-2  bg-white rounded-t-md">
                    <input
                    ref={inputRef}
                        type="text"
                        placeholder='Search product'
                        className='p-2 rounded-lg text-sm outline-none border-gray-500 border w-full'
                        value={searchQuery} // Bind input value to searchQuery state
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                    />
                </div>

                {/* Scrollable product list */}
                <div className="p-2 w-full bg-white rounded-b-md overflow-y-auto" style={{ height: 'calc(100% - 50px)' }}>
                    <div className='mt-2'>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                            {
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard
                                            product={product}
                                            key={product.id}
                                            showRating={false}
                                            showActionIcons={false}
                                        />
                                    ))
                                ) : (
                                    <div>No products found</div> // Display when no match is found
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
