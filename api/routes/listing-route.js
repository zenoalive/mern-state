import express from 'express'
import { createListing, deleteListing, updateListing } from '../controllers/listing-controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

// Check authentication before creating a listing
router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)

export default router