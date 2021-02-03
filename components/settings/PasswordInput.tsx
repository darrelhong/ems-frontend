import { useState } from 'react';
import {
  Button,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const PasswordInput = forwardRef(
  (
    {
      name,
      id,
      placeholder,
    }: {
      name: string;
      id: string;
      placeholder: string;
    },
    ref
  ): JSX.Element => {
    const [show, setShow] = useState(false);
    const handleClick = (): void => setShow(!show);

    return (
      <InputGroup>
        <Input
          // pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          id={id}
          ref={ref}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);

export default PasswordInput;
