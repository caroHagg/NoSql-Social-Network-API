const { Thought, User } = require('../models');


module.exports = {
  getThoughts(req, res) { 
    Thought.find()
    .then((thought) =>{
      if(!thought[0]){
        return res.status(404).json({ message: 'No thoughts in this DB' })
      }
      res.json(thought)
    }).catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>{
        if(!thought){
          return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.json(thought)

  }).catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>{
        if(!user){
          return res.status(404).json({
            message: 'thought created, but found no user with that ID',})
        }
      res.json('Created the thought')
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>{
        if(!thought){
          return res.status(404).json({ message: 'No thought with this id!' })
        }
        res.json(thought)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>{
        if(!thought){
          return res.status(404).json({ message: 'No thought with this id!' })
        }
       
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }, 
          { new: true }
        )})
      .then((user) =>{
        
        if(!user){
          return res.status(404).json({ message: 'thought deleted but no user with this id!' })
        }
        res.json({ message: 'thought successfully deleted!' })
      })
      .catch((err) => res.status(500).json(err));
  },
  //add reaction
  addThoughtReactions(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>{
        if(!thought){
          return res.status(404).json({ message: 'No thought with this id!' })
        }
      res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
  // Remove  reactions
  removeThoughtReactions(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions:{'_id': req.params.reactionId }} },
      { new: true }
    )
      .then((thought) =>{
        if(!thought){
          return res.status(404).json({ message: 'No thought with this id!' })
        }
      res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
};
