import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';

const MealPage = () => {
  return (
    <div className='page-container'>
      <div className='export-btn'>
        <button>Export to PDF</button>
        <button>Export to CSV</button>
      </div>
      <div className='title-row'>
        <input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' />
        <p>Carbs</p>
        <p>Date</p>
        <p>Time</p>
        <p>Protein</p>
        <p>Fats</p>
        <p>Note</p>
        <p>Actions</p>
      </div>
      <hr />
      <div className='title-row'>
        <input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' />
        <p>Carbs</p>
        <p>Date</p>
        <p>Time</p>
        <p>Protein</p>
        <p>Fats</p>
        <p>Note</p>
        <p>
          <img src={edit_btn} alt='edit' />
          <img src={delete_btn} alt='delete' />
        </p>
      </div>
    </div>
  );
};

export default MealPage;
