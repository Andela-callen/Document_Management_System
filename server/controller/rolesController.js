import db from '../models';
import helper from '../controller/helpers/helper';

class roleController{
  static createRole(req, res){
    db.Role.find({ where: {title: req.body.title} })

    .then((result) => {
      if (result) {
        res.status(409).json({msg: 'Role already exists' });
      } else {
        db.Role.create(req.body)
        .then(role => res.status(201).json(role))
        .catch(() => res.status(400).json({msg: 'title cannot be empty' }));
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
      res.status(200).json({result: result.rows, pagination});
    })
    .catch((err) => res.status(500).json({error: err.message}));
  }

    


  static updateRole(req, res){
    db.Role.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (role && role.title === 'Admin') {
        res.status(403).json({ message: 'can\'t update admin role' });
      }
      db.Role.findById(req.params.id)
      .then((role) => {
        if (!role){
          res.status(404).json({ message: 'role does not exist' });
        }
        role.save().then(() => {
          res.status(200).json({ msg: 'Role updated' });
      })
      }).catch((err) => {
        res.status(500).json({ msg: err.message });
      });
    });

  }

  static deleteRole(req, res){
    db.Role.findById(req.params.id)
      .then((role) => {
        if (role && role.title === 'Admin') {
          res.status(403).json({ msg: 'can\'t delete Admin role'});
        }
        if (role < 1) {
          res.status(200).json({ msg: `No role found` });
        }
        db.Role.destroy({ where: { id: req.params.id } })
          .then((role) => {
            res.status(201).json({ msg: 'Role deleted' });
          }). catch ((err) => res.status(500).json({ msg : err.message}));
      });
  }
}

export default roleController;