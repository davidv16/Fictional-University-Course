/**
 * a function to register a new block type for the gutenberg editor.
 * @param name brad is the namespace and border-box is the name, so if there is another plugin named border-box they wont clash.
 * @param object
 */
wp-blocks.registerBlockType('brad/border-box', {
  //title of the custom block in the gutenberg selector
  title: 'My Cool Border Box',
  //icon of the custom block
  icon: 'smiley',
  //where you will find the custom block in the list.
  category: 'common',
  //what attributes the block owns
  attributes: {
    //which are a textbox
    content: {type: 'string'},
    //and a color picker tool
    color: {type: 'string'}
  },
  edit: (props) => {
    // react frontend stuff for the edit window of the custom block
    return wp.element.createElement(
      "div",
      null,
      wp.element.createElement(
       "h3",
       null,
       "Your Cool Border box", 
      ),
      wp.element.createElement("input", { type: "text" })
    )
  },
  save: (props) => {
    return null
  }
})