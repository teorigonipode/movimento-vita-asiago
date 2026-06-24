-- Rimuovi il campo message dalla tabella volunteer_requests
-- Non e' piu' necessario: il form usa availability e motivation

ALTER TABLE volunteer_requests DROP COLUMN IF EXISTS message;
