const FormPerson = ({ onSubmit, fields, onChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={fields.name} onChange={onChange} name='name' />
    </div>
    <div>
      number: <input value={fields.number} onChange={onChange} name='number' />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default FormPerson;
