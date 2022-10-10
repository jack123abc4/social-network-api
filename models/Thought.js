const { Schema, model } = require('mongoose');



const reactionSchema = new Schema( 
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

function formatDate(date) {
  d = date;

  const time = new Intl.DateTimeFormat('en-us', {timeStyle:'short'}).format(d);
  const day = new Intl.DateTimeFormat('en-us', {day:'2-digit'}).format(d);
  let ordinal;
  switch(true) {
      case day % 10 === 1 && day !== 11:
          ordinal = 'st';
          break;
      case day % 10 === 2 && day !== 12:
          ordinal = 'nd';
          break;
      case day % 10 === 3 && day !== 13:
          ordinal = 'rd';
          break;
      default:
          ordinal = 'th';
  }
  const month = new Intl.DateTimeFormat('en-us', {month:'short'}).format(d);
  const year = d.getFullYear();

  return `${month} ${day}${ordinal}, ${year} at ${time}`;
}


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
//Jun 10th, 2020 at 01:38 pm