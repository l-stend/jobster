import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow } from '../components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Incomplete Values');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password })); //due modi diversi di passare i valori
      return;
    }
    dispatch(registerUser({ name, email, password })); //due modi diversi di passare i valori
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='text'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          {isLoading ? 'loading...' : 'Submit'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type='button'
            onClick={toggleMember}
            className='member-btn'
            disabled={isLoading}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
