import { forwardRef, useImperativeHandle, useReducer } from 'react';

const visiblityReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBLITY':
      return action.payload;
    default:
      return state;
  }
};

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable';

  const [visible, visiblityDispatch] = useReducer(
    visiblityReducer,
    props.isVisible || false
  );

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    visiblityDispatch({ type: 'CHANGE_VISIBLITY', payload: !visible });
  };

  // to expose toggleVisibility to the parent component using ref. Allows parent to directly call toggleVisibility
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
