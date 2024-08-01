import { createAsyncThunk } from '@reduxjs/toolkit';
import { purchaseHistoryActions } from '../actions/purchaseHistoryActions';
import purchaseHistoryService from '../services/purchaseHistoryService';

export const getPurchaseHistoryAsync = createAsyncThunk(
	purchaseHistoryActions.GET_PURCHASE_HISTORY,
	async () => {
		return await purchaseHistoryService.getPurchaseHistory();
	}
);

export const addToPurchaseHistoryAsync = createAsyncThunk(
	purchaseHistoryActions.ADD_TO_PURCHASE_HISTORY,
	async (item) => {
		return await purchaseHistoryService.addToPurchaseHistory(item);
	}
);