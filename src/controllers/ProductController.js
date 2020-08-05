// Controller vai tratar as operaçõesdo Model

const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; // desestruturação e valor default = 1 / query = parâmetros GET 

    // const products = await Product.find();
    const products = await Product.paginate({/*filtro*/}, { page, limit: 5 }); // mongoosePaginate

    // essa linha só executa depois do await
    return res.json(products);
  },

  async show(req, res) {
    const products = await Product.findById(req.params.id); // pega o /api/products/:id

    return res.json(products);
  },

  async store(req, res) {
    const products = await Product.create(req.body);

    return res.json(products);
  },

  async update(req, res) {
    // pega de params.id e muda com o body / new: true vai retornar o product já atualizado
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(product);
  },
  
  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send(); // apenas retorna uma mensagem de sucesso
  }
}