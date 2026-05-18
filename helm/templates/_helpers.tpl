{{- define "just-auth.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "just-auth.labels" -}}
helm.sh/chart: {{ include "just-auth.name" . }}-{{ .Chart.Version | replace "+" "_" }}
{{ include "just-auth.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "just-auth.selectorLabels" -}}
app.kubernetes.io/name: {{ include "just-auth.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
