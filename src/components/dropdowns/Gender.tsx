import React from 'react';

//Gender props interface
interface GenderProps{
    value:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Gender({value, onChange}:GenderProps) {
  return (
    <div className="mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={value}
              onChange={onChange}
              required
            >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
    </div>
  )
}