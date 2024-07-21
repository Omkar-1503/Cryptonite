import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coin {
  id: string;
  name: string;
  image: string;
}

interface WatchlistState {
  items: Coin[];
}

const initialState: WatchlistState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Coin>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    reorderItems: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const [movedItem] = state.items.splice(action.payload.sourceIndex, 1);
      state.items.splice(action.payload.destinationIndex, 0, movedItem);
    },
  },
});

export const { addItem, removeItem, reorderItems } = watchlistSlice.actions;

export default watchlistSlice.reducer;
