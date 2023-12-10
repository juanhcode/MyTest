#!/bin/bash

test_files=(
    "src/tests/caso.test.js"
    "src/tests/seguimiento.test.js"
    "src/tests/user.test.js"
    "src/tests/permisoUsuario.test.js"
    "src/tests/permiso.test.js"
)

for test_file in "${test_files[@]}"; do
    echo "RUNS $test_file"
    npm run test:dev -- "$test_file"

    # Espera 5 segundos antes de pasar al siguiente archivo de prueba
    sleep 5
done
