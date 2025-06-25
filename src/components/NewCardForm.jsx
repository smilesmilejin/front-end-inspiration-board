import {useState} from 'react';

const kDefaultFormState = {
    message:'',
};


const kErrorState = {
    message:'Message cannot be empty',
};


const NewCardForm = ({onPostCard}) => {
    const[formData, setFormData] = useState(kDefaultFormState);
    const [errors, setErrors] = useState(kErrorState);

    const handleSubmit = (event) => {
        console.log('submitted!');

        event.preventDefault();
        
        const trimmedMessage = formData.message.trim();

        // trim the title and owner before posting
        console.log("Posting:", { message: trimmedMessage});
        onPostCard({ message: trimmedMessage});

        setFormData(kDefaultFormState);

        setErrors(kErrorState);


    };

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setFormData(formData => {
            return {...formData, [inputName]: inputValue};
        });

        const trimmedLength = inputValue.trim().length;

        if (trimmedLength === 0) {
            setErrors((prev) => ({
                ...prev,
                [inputName]: 'Message cannot be empty',
            }));
            } else if (trimmedLength > 40) {
            setErrors((prev) => ({
                ...prev,
                [inputName]: 'Message cannot exceed 40 characters',
            }));
            } else {
            setErrors((prev) => ({
                ...prev,
                [inputName]: null, // no error
            }));
        }
    };

    const makeControlledInput = (inputName) => {
        return (
            <>
                <input
                    onChange={handleChange}
                    type='text'
                    id={`input-${inputName}`}
                    name={inputName}
                    value={formData[inputName]}
                    placeholder={inputName}
                />
                {errors[inputName] && (
                    <p>{errors[inputName]}</p>
                )}

            </>
        );
    };

    return (
    <form onSubmit={handleSubmit}>
      <div>
        {makeControlledInput('message')}
      </div>
      <div className="button-wrapper">
        <button disabled={errors.message}>Create</button>
      </div>
    </form>
  );
}


export default NewCardForm;