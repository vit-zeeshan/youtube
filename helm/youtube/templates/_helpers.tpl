{{- define "youtube.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "youtube.name" -}}
{{- .Chart.Name -}}
{{- end -}}
