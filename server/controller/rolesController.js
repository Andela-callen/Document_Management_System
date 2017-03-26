import db from '../models';
import helper from '../controller/helpers/helper';

class roleController{
  static createRole(req, res){
    db.Role.find({ where: {title: req.body.title} })

    .then((result) => {
      if (result) {
        return res.status(409).json({msg: 'Role already exists' });
      } else {
        db.Role.create(req.body)
        .then((role) =>{
          return res.status(201).json(role)
        })
        .catch(() => {
          return res.status(400).json({msg: 'title cannot be empty' })});
      }
    });
  }


  static getAll(req, res){
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];

    db.Role.findAndCountAll(query)
    .then ((result) => {
      const offset = query.offset;
      const limit = query.limit;
      
      const pagination = helper.pagination(result, offset, limit);
     return res.status(200).json({result: result.rows, pagination});
    })
    .catch((err) => {
      return res.status(404).json({msg: 'Not Found'})});
  }

    


  static updateRole(req, res){
    db.Role.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (role && role.title === 'Admin') {
        return res.status(403).json({ msg: 'can\'t update admin role' });
      }
      db.Role.findById(req.params.id)
      .then((role) => {
        if (!role){
          return res.status(404).json({ msg: 'role does not exist' });
        }
        role.save().then(() => {
          return res.status(200).json({ msg: 'Role updated' });
      })
      }).catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
    });

  }

  static deleteRole(req, res){
    db.Role.findById(req.params.id)
      .then((role) => {
        if (role && role.title === 'Admin') {
          return res.status(403).json({ msg: 'can\'t delete Admin role'});
        }
        if (role < 1) {
          return res.status(404).json({ msg: `No role found` });
        }
        db.Role.destroy({ where: { id: req.params.id } })
          .then((role) => {
            return res.status(200).json({ msg: 'Role deleted' });
          }). catch ((err) => {
            return res.status(500).json({ msg : err.message})});
      });
  }
}

export default roleController;