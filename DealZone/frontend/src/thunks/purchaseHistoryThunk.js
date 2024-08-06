import { createAsyncThunk } from '@reduxjs/toolkit';
import { purchaseHistoryActions } from '../actions/purchaseHistoryActions';
import purchaseHistoryService from '../services/purchaseHistoryService';

export const getPurchaseHistoryAsync = createAsyncThunk(
	purchaseHistoryActions.GET_PURCHASE_HISTORY,
	async () => {
		const data = await purchaseHistoryService.getPurchaseHistory();
		console.log('Thunk fetched purchase history:', data); // Log data to verify what is received
		return data;
	}
);

export const addToPurchaseHistoryAsync = createAsyncThunk(
	purchaseHistoryActions.ADD_TO_PURCHASE_HISTORY,
	async (item) => {
		return await purchaseHistoryService.addToPurchaseHistory(item);
	}
);