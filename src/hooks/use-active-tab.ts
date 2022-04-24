import { ActionCreator, ActiveTab } from '../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux'


const useActiveTab = (activeTab:ActiveTab) => {
  const dispatch = useDispatch();
  dispatch(ActionCreator.setActiveTab(activeTab));
  return;
};


export default useActiveTab;
