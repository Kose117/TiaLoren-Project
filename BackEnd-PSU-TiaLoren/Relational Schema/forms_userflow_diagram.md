::: mermaid
    flowchart TB

    subgraph index.html
        direction TB
        A["Registrar mi Grupo Familiar"]
        B["Registrar como Adulto Individual"]
    end

    %% Formulario de Grupo Familiar
    subgraph Formulario_Grupo_Familiar
        direction TB
        
        subgraph Grupo_Info
            direction RL
            estratoField["Estrato Social del Grupo"]
            grupoPoblacionalField["Grupo Poblacional que más aplica al Grupo"]
            vulnerabilidadField["Grado de vulnerabilidad que más aplica al Grupo"]
        end
        
        subgraph Location_Info_Grupo
            direction RL
            ciudadField["Ciudad de residencia del Grupo"]
            localidadField["Localidad del Grupo (si es aplicable)"]
            direccionField["Dirección de residencia del Grupo"]
        end
    end

    %% Formulario de Adulto Titular
    subgraph Formulario_Adulto_Titular
        direction TB
        
        subgraph Personal_Info_Titular
            direction RL
            num_doc_titular["Número de Documento"]
            doc_type_titular["Tipo de Documento"]
            name_titular["Nombre"]
            birthdate_titular["Fecha de Nacimiento"]
        end
        
        subgraph Contact_Info_Titular
            direction RL
            sexo_titular["Sexo"]
            celular_titular["Celular"]
            correo_titular["Correo"]
        end
        
        subgraph Health_Info_Titular
            direction RL
            grupoSanguineo_titular["Grupo Sanguíneo"]
            eps_titular["EPS"]
        end
    end

    %% Formulario de Adulto en Grupo Familiar
    subgraph Formulario_Adulto_Grupo_Familiar
        direction TB
        
        subgraph Personal_Info_AdultoGF
            direction RL
            num_doc_adultoGF["Número de Documento"]
            doc_type_adultoGF["Tipo de Documento"]
            name_adultoGF["Nombre"]
            birthdate_adultoGF["Fecha de Nacimiento"]
        end
        
        subgraph Contact_Info_AdultoGF
            direction RL
            sexo_adultoGF["Sexo"]
            celular_adultoGF["Celular"]
            correo_adultoGF["Correo"]
        end
        
        subgraph Health_Info_AdultoGF
            direction RL
            grupoSanguineo_adultoGF["Grupo Sanguíneo"]
            eps_adultoGF["EPS"]
        end
        
        parentesco_titular_adultoGF["Parentesco con Titular"]
    end

    %% Formulario de Menor
    subgraph Formulario_Menor
        direction TB
        
        subgraph Personal_Info_Menor
            direction RL
            num_doc_menor["Número de Documento"]
            doc_type_menor["Tipo de Documento"]
            name_menor["Nombre"]
            birthdate_menor["Fecha de Nacimiento"]
        end
        
        subgraph Contact_Info_Menor
            direction RL
            sexo_menor["Sexo"]
            celular_menor["Celular"]
        end
        
        grupo_sanguineo_menor["Grupo Sanguineo"]
        eps_menor["EPS"]
        parentesco_titular_menor["Parentesco con Titular"]
    end

    %% Formulario de Adulto Individual
    subgraph Formulario_Adulto_Individual
        direction TB
        
        subgraph Personal_Info_Ind
            direction RL
            num_doc_ind["Número de Documento"]
            doc_type_ind["Tipo de Documento"]
            name_ind["Nombre"]
            birthdate_ind["Fecha de Nacimiento"]
        end
        
        subgraph Contact_Info_Ind
            direction RL
            sexo_ind["Sexo"]
            celular_ind["Celular"]
            correo_ind["Correo"]
        end
        
        subgraph Location_Info_Ind
            direction RL
            ciudad_ind["Ciudad"]
            localidad_ind["Localidad (si es aplicable)"]
            direccion_ind["Dirección de residencia"]
        end

        subgraph Additional_Info_Ind
            direction RL
            grupoPoblacional_ind["Grupo Poblacional"]
            vulnerabilidad_ind["Grado de Vulnerabilidad"]
            estrato_ind["Estrato Social"]
            grupoSanguineo_ind["Grupo Sanguíneo"]
            eps_ind["EPS"]
        end
    end

    %% Navigation Flow
    memberDecision{Añadir un menor o adulto del grupo familiar?}
    addAdditionalMembers{Añadir otro Miembro al grupo Familiar?}

    B ---> Formulario_Adulto_Individual
    A ---> Formulario_Grupo_Familiar

    Formulario_Grupo_Familiar ---> Formulario_Adulto_Titular
    Formulario_Adulto_Titular ---> memberDecision
    memberDecision --Menor--> Formulario_Menor
    memberDecision --Mayor--> Formulario_Adulto_Grupo_Familiar
    Formulario_Menor ---> addAdditionalMembers
    Formulario_Adulto_Grupo_Familiar ---> addAdditionalMembers
    addAdditionalMembers --Si--> memberDecision
    addAdditionalMembers --Nop--> Finalizacion_Inscripcion
:::


