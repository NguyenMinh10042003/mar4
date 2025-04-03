// filepath: c:\Users\PHONG\Desktop\NNPTUD_S5-27Mar\models\menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    
        text: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: 'Menu',
            default: null
        }
    }, {
        timestamps: true
    });
// Tạo slug trước khi lưu

module.exports = mongoose.model('Menu', menuSchema);