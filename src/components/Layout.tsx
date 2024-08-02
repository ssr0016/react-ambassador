import React, {Dispatch, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Menu from './Menu';
import axios from 'axios';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

type LayoutProps = {
  children: React.ReactNode;
  setUser: (user: User) => void;
};

const Layout: React.FC<LayoutProps> = ({ children, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to the login page if there's an error
      }
    };

    fetchUserData();
  }, [navigate, setUser]);

  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="py-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User}) => ({
  user: state.user
})

const mapDispatchProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchProps) (Layout);
