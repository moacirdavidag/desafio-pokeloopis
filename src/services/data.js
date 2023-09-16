export const salvarRecorde = (pontuacao) => {
    const pontuacaoAtual = localStorage.getItem('recorde') || 0;
    return pontuacao > pontuacaoAtual ? localStorage.setItem('recorde', pontuacao) : localStorage.setItem('recorde', pontuacaoAtual);
}