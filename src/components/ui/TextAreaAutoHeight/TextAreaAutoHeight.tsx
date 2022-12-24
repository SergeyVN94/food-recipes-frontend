import React, { ChangeEvent, RefObject, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

const updateHeight = (ev: React.ChangeEvent<HTMLTextAreaElement>, maxRows?: number) => {
  const textarea = ev.target;

  textarea.style.height = 'auto';
  const offset = textarea.offsetHeight - textarea.clientHeight;
  let nextHeight = textarea.scrollHeight + offset;

  if (_.isNumber(maxRows)) {
    const rowHeight = _.parseInt(window.getComputedStyle(textarea).lineHeight);
    const maxHeight = maxRows * rowHeight;

    if (nextHeight > maxHeight) nextHeight = maxHeight;
  }

  textarea.style.height = `${nextHeight}px`;
};

const TextAreaAutoHeight: React.FC<{
  children: JSX.Element;
  maxRows?: number;
  inputRef: RefObject<HTMLTextAreaElement>;
}> = observer(({ children, maxRows, inputRef }) => {
  useEffect(() => {
    const handleChange = (ev: Event) => updateHeight(
      ev as unknown as ChangeEvent<HTMLTextAreaElement>,
      maxRows,
    );

    if (inputRef.current) inputRef.current.addEventListener('input', handleChange);

    return () => {
      if (inputRef.current) inputRef.current.removeEventListener('input', handleChange);
    };
  }, [inputRef.current, maxRows]);

  return children;
});

export default TextAreaAutoHeight;
