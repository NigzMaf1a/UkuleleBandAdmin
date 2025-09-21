import React from 'react';
import { useTranslation } from 'react-i18next';

// interface for the props
interface UserTypeProps {
  value: string;
  onChange: (val: string) => void;
}

export default function UserTypeAdmin({ value, onChange }: UserTypeProps) {
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
        <option value="Admin">{t('admin')}</option>
        <option value="Supplier">{'Supplier'}</option>
        <option value="Owner">{t('owner')}</option>
      </select>
    </div>
  );
}
