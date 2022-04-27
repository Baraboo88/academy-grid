import { DataActionCreator, ActiveTab } from '../reducer/data/data-reducer';
import { useDispatch } from 'react-redux'


const useActiveTab = (activeTab:ActiveTab) => {
  const dispatch = useDispatch();
  dispatch(DataActionCreator.setActiveTab(activeTab));
  return;
};


export default useActiveTab;
