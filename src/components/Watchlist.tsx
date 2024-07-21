// "use client";

// import React from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Image from 'next/image';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/store/store';
// import { addItem, removeItem } from '@/store/watchlistSlice';
// import axios from 'axios';

// // Define a type for the coin
// type Coin = {
//   id: string;
//   name: string;
//   image: string;
// };

// const Watchlist = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const items = useSelector((state: RootState) => state.watchlist.items);
//   const [searchQuery, setSearchQuery] = React.useState<string>('');
//   const [suggestions, setSuggestions] = React.useState<Coin[]>([]);

//   const onDragEnd = (result: any) => {
//     const { source, destination } = result;

//     if (!destination) return;

//     const updatedItems = Array.from(items);
//     const [movedItem] = updatedItems.splice(source.index, 1);
//     updatedItems.splice(destination.index, 0, movedItem);

//     // Update the state in your slice
//     // Assuming a reorder action is defined in your slice
//     // dispatch(reorderItems({ sourceIndex: source.index, destinationIndex: destination.index }));
//   };

//   const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value;
//     setSearchQuery(query);

//     if (query.length > 2) {
//       try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
//         const results = response.data.coins.map((coin: any) => ({
//           id: coin.id,
//           name: coin.name,
//           image: coin.large,
//         }));
//         setSuggestions(results);
//       } catch (error) {
//         console.error('Error fetching coin data:', error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const addToWatchlist = (coin: Coin) => {
//     if (!items.includes(coin.id)) {
//       dispatch(addItem(coin.id));
//       setSuggestions([]);
//       setSearchQuery('');
//     }
//   };

//   const removeFromWatchlist = (id: string) => {
//     dispatch(removeItem(id));
//   };

//   return (
//     <div className="bg-gray-800 shadow-md rounded-lg p-4 text-gray-100">
//       <header className="mb-6">
//         <h1 className="text-3xl font-bold mb-4">DecentraList</h1>
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search for a cryptocurrency..."
//             className="w-full p-2 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg"
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute bg-gray-900 border border-gray-700 rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-10 text-gray-100">
//               {suggestions.map((coin) => (
//                 <li
//                   key={coin.id}
//                   onClick={() => addToWatchlist(coin)}
//                   className="p-2 cursor-pointer hover:bg-gray-700 flex items-center space-x-2"
//                 >
//                   <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded" />
//                   <span>{coin.name}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </header>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided) => (
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-4"
//             >
//               {items.map((id, index) => {
//                 const coin = suggestions.find(c => c.id === id);
//                 if (!coin) return null;

//                 return (
//                   <Draggable key={id} draggableId={id} index={index}>
//                     {(provided) => (
//                       <li
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="bg-gray-700 p-4 rounded-lg shadow-sm flex items-center space-x-4"
//                       >
//                         <Image
//                           src={coin.image}
//                           alt={coin.name}
//                           width={40}
//                           height={40}
//                           className="rounded"
//                         />
//                         <span className="text-gray-100">{coin.name}</span>
//                         <button onClick={() => removeFromWatchlist(id)} className="ml-auto text-red-500">
//                           Remove
//                         </button>
//                       </li>
//                     )}
//                   </Draggable>
//                 );
//               })}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Watchlist;
