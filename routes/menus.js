const express = require("express");
const Menu = require("../schemas/menu");
const router = express.Router();

// Hàm đệ quy để tạo cây menu
async function buildMenu(parentId = null) {
  const menus = await Menu.find({ parent: parentId }).lean();
  for (const menu of menus) {
    menu.children = await buildMenu(menu._id);
  }
  return menus;
}

// API trả về menu dưới dạng JSON
router.get("/", async (req, res) => {
  const menuTree = await buildMenu();
  res.json(menuTree);
});

// API trả về menu dưới dạng HTML
router.get("/html", async (req, res) => {
  const menuTree = await buildMenu();

  function renderMenu(menuItems) {
    if (!menuItems.length) return "";
    return `<ul>` + menuItems.map(item =>
      `<li><a href="${item.url}">${item.text}</a>` + renderMenu(item.children) + `</li>`
    ).join("") + `</ul>`;
  }

  res.send(renderMenu(menuTree));
});

router.post('/', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
