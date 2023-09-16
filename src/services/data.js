export const salvarRecorde = (pontuacao) => {
    const pontuacaoAtual = pontuacao;
    return pontuacao > pontuacao ? localStorage.setItem('recorde', pontuacao) : localStorage.setItem('recorde', pontuacaoAtual);
}