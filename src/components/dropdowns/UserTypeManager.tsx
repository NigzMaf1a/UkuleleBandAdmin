import React from 'react';
import { useTranslation } from 'react-i18next';

//interface for the props
interface UserTypeProps {
  value: string;
  onChange: (val: string) => void;
}

export default function UserTypeManager({ value, onChange }: UserTypeProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label htmlFor="type" className="form-label">
        {t('selectType')}
      </label>
      <select
        id="type"
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="" disabled>
          {t('selectType')}
        </option>
        <option value="Waiter">{t('waiter')}</option>
        <option value="Chef">{t('chef')}</option>
      </select>
    </div>
  );
}
